
import React from 'react'
import { Button, Container, Form, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import { searchTable } from '../Redux/tableSlice'
export const Header = (props:any) => {
    const dispatch = useDispatch()
    const { 
        register,
        formState: {
        errors
        },
        handleSubmit,
        reset,
      } = useForm({
        mode: "onSubmit"
      });

      const onSubmit = (data:any)=>{
        dispatch(searchTable(data.searchSubmit))
        props.setActive(1)
        reset()
      }

  return (
    <div>
        <Navbar className='navbar_search navbar_search' bg="dark" expand="lg">
            <Container fluid>
                <Form onSubmit={handleSubmit(onSubmit)} className="d-flex form_search">
                    <Form.Control
                    {...register('searchSubmit')}
                    type="search"
                    placeholder="Поиск"
                    className="me-2 form_control_header"
                    aria-label="Search"
                    autoComplete='off'
                    />
                    <button type='submit' className='Button_header' ></button>
                </Form>
               
            </Container>
        </Navbar>
    
    </div>
  )
}
