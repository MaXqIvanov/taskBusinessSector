
import React from 'react'
import s from '../scss/mainpage.module.scss'
export const TemplateTables = (props:any) => {
  return (
    <div className={s.templTables}>
      <div className={s.start_table}>{props.elem.id}</div>
      <div className={s.middle_table}>{props.elem.title}</div>
      <div className={s.end_table}>{props.elem.body}</div>
    </div>
  )
}
