import {createSlice} from '@reduxjs/toolkit';

const tableSlice = createSlice({
    name:'table',
    initialState: {
        rowSelection: []
    },
    reducers : {
        setSelectedRows: (state,action) => {
            state.rowSelection = action.payload
        }
    }
})

export const {setSelectedRows} = tableSlice.actions
export default tableSlice.reducer

export const selectRowSelection = (state) => state.table.rowSelection