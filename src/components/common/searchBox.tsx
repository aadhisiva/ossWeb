import React from 'react'
import { Form } from 'react-bootstrap'
import { ISearchBox } from '../../utilities/interfacesOrtype'

export const SearchBox: React.FC<ISearchBox> = ({searchTerm, setSearchTerm}) => {
  return (
    <div>
        <Form.Group controlId="search">
        <Form.Control
          className='border-black'
          type="text"
          placeholder="Search Any"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      
    </div>
  )
}
