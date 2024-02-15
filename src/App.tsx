import { useState, useMemo, useEffect } from 'react';
import { MaterialReactTable } from "material-react-table"

import './App.css';
import { useQuery, useMutation } from "@apollo/client"
import { ItemType } from './types'


import { GET_ITEMS } from './apollo/queries';
import { DELETE_ITEM } from './apollo/mutations'

import Spacer from './Components/Spacer';
import { getMessage } from './helpers/errorHandling';

import { Delete } from '@mui/icons-material';
import { Box, Tooltip, IconButton, CircularProgress, Backdrop } from '@mui/material'
import ItemsForm from './Components/ItemsForm';
import MutationsStatus from './Components/mutation-status/Mutationstatus';

function App() {
  const [tableData, setTableData] = useState<ItemType[] | undefined>()
  const [board, setBoard] = useState<any | null>()

  const { loading, error, data, refetch } = useQuery(GET_ITEMS, {
    fetchPolicy: 'network-only',

  })

  const [
    deleteItem,
    { loading: deleteMutationLoading, error: deleteMutationError, data: deleteMutationData },
  ] = useMutation(DELETE_ITEM)

  useEffect(() => {
    if (data) {
      const { boards } = data

      const board = boards.find(el => el.id === process.env.REACT_APP_BOARD_ID)
      const { items_page: { items = [] } = {} } = board

      const itemsModified: ItemType[] = []

      items.forEach(item => {
        let obj: ItemType = {
          name: item.name,
          text: '',
          numbers: '',
          status: '',
          id: item.id
        }
        item.column_values.forEach(el => {
          obj = { ...obj, [el.column.title.toLowerCase()]: el.text }
        })
        itemsModified.push(obj)
      })

      setTableData(itemsModified)

      setBoard(board)
    }
  }, [data])

  const columnsTable = useMemo(() => {
    if (board) {
      const { columns } = board

      let columnsModified: any[] = []

      // @ts-ignore
      columns.forEach(col => {
        columnsModified.push({// @ts-ignore
          header: col.title,// @ts-ignore
          accessorKey: col.title.toLowerCase(),
        })
      })
      return columnsModified
    }
    return
  }, [board])

  const handleDeleteItem = (row) => {
    // @ts-ignore
    const id = tableData[row.index].id

    deleteItem({
      variables: { item_id: id },
      onCompleted: (data) => {
        refetch()
      }
    })

  }

  let errorMessage;
  if (error) {
    if (error.networkError &&
      typeof window !== 'undefined' &&
      !window.navigator.onLine) {
      errorMessage = ('Sorry, your browser is offline.')
    } else {
      errorMessage = getMessage(error)

    }
  }


  return (
    <div className='px-10 py-10 bg-gray-250 min-h-[100vh]' >
      <h1 className='text-center text-primary-500 text-2xl font-semibold'>{board && board.name}</h1>
      <Spacer />

      <MutationsStatus loading={deleteMutationLoading} success={deleteMutationData} error={deleteMutationError} />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}

      >
        <h3>Loading...</h3>
        <CircularProgress color="primary" />
      </Backdrop>



      {errorMessage && <p className='text-center text-red-500 font-bold'>{errorMessage}</p>}
      {/* {error && 'Srtooor'} */}


      {columnsTable && ( // @ts-ignore
        <MaterialReactTable
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          columns={columnsTable}
          data={tableData} // @ts-ignore          
          enableColumnOrdering
          enableEditing

          renderRowActions={({ row }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton
                  color="error"
                  onClick={() => handleDeleteItem(row)}
                  disabled={deleteMutationLoading || loading}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <ItemsForm
              refetch={refetch}

            />
          )}

        />
      )}

    </div>
  );
}

export default App;
