
import React, { useEffect, useState } from 'react'
import { Button, Nav, Navbar, NavDropdown, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TemplateTables } from '../components/TemplateTables'
import { paginateTables, sortTables } from '../Redux/tableSlice'

import s from '../scss/mainpage.module.scss'

export const MainPage = (props:any) => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const {sortTable, tables, limit} = useSelector((state:any)=> state.table)
    const [sortId, setSortId] = useState(false);
    const [sortTitle, setSortTitle] = useState(false);
    const [sortDescription, setSortDescription] = useState(false);
    let items = [];
    for (let number = 1; number <= limit; number++) {
    items.push(
        <Pagination.Item onClick={()=>changeTable(number)} key={number} active={number == props.active}>
        {number}
        </Pagination.Item>,
    );
    }
    useEffect(() => {
        dispatch(paginateTables(props.active))
        nav(`/?page=${props.active}`)
    }, [props.active, limit])
    

    const changeTable = (data:any)=>{
        if(data>0 && data <= limit){
            props.setActive(data)
        }
    }
    const sortingTable = (data:any)=>{
        dispatch(sortTables(data))
    }
    
  return (
      <>
        <Navbar collapseOnSelect expand="lg" className={s.navbarMainPage} bg="dark" variant="dark">
                <Nav  className="me-auto nav_header">
                    <NavDropdown onClick={()=>{
                        sortingTable({variantSort:'id', page:props.active, isSort:sortId})
                        setSortId(!sortId)
                    }} title="ID" id="collasible-nav-dropdown">
                    </NavDropdown>
                    <NavDropdown onClick={()=>{
                        sortingTable({variantSort:'title', page:props.active, isSort:sortTitle})
                        setSortTitle(!sortTitle)
                    }} title="заголовок" id="collasible-nav-dropdown">
                    </NavDropdown>
                    <NavDropdown onClick={()=>{
                        sortingTable({variantSort:'description', page:props.active, isSort:sortDescription})
                        setSortDescription(!sortDescription)
                    }} title="описание" id="collasible-nav-dropdown">
                    </NavDropdown>
                </Nav>
          
     
       </Navbar>
    <div className={s.main}>
        {sortTable.length > 0 && limit > 0  ? sortTable.map((elem:any)=> 
            <TemplateTables elem={elem}/>
        )
    : <div className={s.not_search_elem}></div>
    }
    </div>
    <div className={s.PaginationButtons}>
        <div className={s.back_div} onClick={()=>changeTable(Number(props.active)-1)}>Назад</div>
        <Pagination className={s.central_pagination_div} size="sm">{items}</Pagination>
        <div className={s.forward_div} onClick={()=>changeTable(Number(props.active)+1)}>Далее</div>
    </div>
    </>
  )
}
