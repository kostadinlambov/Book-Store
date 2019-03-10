import React from 'react'

const OrderDetailsRow = (props) => {
  const {title, price} = props.product
  let total = price
  return (
    <tr>
      <th>#{props.index + 1}</th>
      <td>{title}</td>
      <td>$ {price.toFixed(2)}</td>
      <td>$ {total.toFixed(2)}</td>
    </tr>
  )
}

export default OrderDetailsRow
