import { createSlice } from "@reduxjs/toolkit";
const { compare } = require('string-compare');
const stringSimilarity = require("string-similarity");

const tableSlice = createSlice({
    name: "table",
    initialState: {
        tables: [] as any[],
        sortTable: [] as any[],
        searchingTable: [] as any[],
        limit: 1 as number
    },
    reducers: {
        addTables(state, action){      
            state.tables = action.payload.data
            let filter = state.tables.slice((action.payload.truePage-1)*10,action.payload.truePage*10)
            state.sortTable = filter
            state.limit = Math.ceil(state.tables.length/10)
        },
        paginateTables(state, action){    
            if(state.searchingTable.length > 0){
                state.sortTable = state.searchingTable.slice((action.payload-1)*10,action.payload*10)
            } else{
                state.sortTable = state.tables.slice((action.payload-1)*10,action.payload*10)
            }
            
        },
        sortTables(state, action){
            state.searchingTable = []
            state.limit = Math.ceil(state.tables.length/10)
            if(action.payload.variantSort == "id"){
                if(action.payload.isSort === false){
                    state.sortTable = state.tables.sort(function(a, b) { return b.id - a.id})
                }
                else {
                    state.sortTable = state.tables.sort(function(a, b) { return a.id - b.id})
                }
                state.sortTable = state.sortTable.slice((action.payload.page-1)*10,action.payload.page*10)
                           
            }
            if(action.payload.variantSort == 'title'){
                let SortArray
                if(action.payload.isSort === false){
                    SortArray = (x:any, y:any)=>{
                        return x.title.localeCompare(y.title);
                    }
                }
                else {
                    SortArray = (x:any, y:any)=>{
                        return y.title.localeCompare(x.title);
                    }
                }
                state.sortTable = state.tables.sort(SortArray);
                state.sortTable = state.sortTable.slice((action.payload.page-1)*10,action.payload.page*10)
            }
            if(action.payload.variantSort == 'description'){
                let SortArray
                if(action.payload.isSort === false){
                SortArray = (x:any, y:any)=>{
                    return x.body.localeCompare(y.body);
                }
            }
            else{
                SortArray = (x:any, y:any)=>{
                    return y.body.localeCompare(x.body);
                }
            }
            state.sortTable = state.tables.sort(SortArray);
            state.sortTable = state.sortTable.slice((action.payload.page-1)*10,action.payload.page*10)
         }
        },  
        searchTable(state,action){
            if(action.payload.length>30){
               const array = state.tables.filter(n => stringSimilarity.compareTwoStrings(n.body.toLowerCase(), action.payload.toLowerCase()) >= 0.60 || stringSimilarity.compareTwoStrings(n.title.toLowerCase(), action.payload.toLowerCase())>=0.66);
              state.searchingTable = array
              state.limit = Math.ceil(state.searchingTable.length/10)
            }else{
                    let array = []
                    for (let count = 0; count < state.tables.length; count++){
                        if (state.tables[count].body.trim().indexOf(action.payload.trim())!==-1 || state.tables[count].title.trim().indexOf(action.payload.trim())!==-1) {
                            array.push(state.tables[count]);
                        }else{  }
                      }
                      state.searchingTable = array
                      state.limit = Math.ceil(state.searchingTable.length/10)
            }              
        }
    }
})

export default tableSlice.reducer
export const {
    addTables,
    sortTables,
    paginateTables,
    searchTable

} = tableSlice.actions
