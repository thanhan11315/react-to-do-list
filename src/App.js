import './App.css';
import React from 'react';
import { useState } from 'react';
import Header from './components/Header';

function App() {
  const buttonAddElement = document.querySelector('.add')

  const buttonEditElement = document.querySelector('.edit')

  const [list, setlist] = useState('')

  const [lists, setlists] = useState(() => {
    const getLocalLists = JSON.parse(localStorage.getItem('lists'))
    if (getLocalLists == null) {
      return []
    } else {
      return getLocalLists
    }
  })

  const handleSubmit = () => {
    if (!list) {
      alert('Vui long nhap du lieu')
    } else {
      setlists(() => {
        const setLocalLists = [list, ...lists]
        localStorage.setItem('lists', JSON.stringify(setLocalLists))
        return setLocalLists
      })
      setlist('')
    }
  }

  const handleDelete = (k) => {
    setlists(() => {

      const setLocalLists = [...lists]

      setLocalLists.splice(k, 1)

      localStorage.setItem('lists', JSON.stringify(setLocalLists))

      return setLocalLists
    })
  }

  // Làm cách nào để lấy đối số e của hàm 'handlEdit' chuyển sang cho hàm 'handleditSubmit' 

  const handlEdit = (e) => {

    setlist(lists[e])

    buttonAddElement.classList.add('hidden')

    buttonEditElement.classList.remove('hidden')

  }


  const handleEditSubmit = () => {

    setlists(() => {

      const setLocalLists = [...lists]

      // setLocalLists.splice(e, 1, list)

      localStorage.setItem('lists', JSON.stringify(setLocalLists))

      return setLocalLists
    })

    buttonEditElement.classList.add('hidden')

    buttonAddElement.classList.remove('hidden')

  }

  return (
    <div className='container'>
      <div className='box-title'>
        <Header />
        <div>
          <input className='inputadd' value={list} onChange={e => setlist(e.target.value)} />
          <button className='add' onClick={() => handleSubmit()}>Add</button>
          <button className='edit hidden' onClick={() => handleEditSubmit()} >Edit</button>
        </div>
      </div>
      <ul className='my-list'>
        {lists.map((list, index) => (
          <li key={index}><span className='span' onClick={() => handlEdit(index)}>{list}</span><button className='delete-button' onClick={() => handleDelete(index)}>x</button></li>
        ))}
      </ul>
    </div>)
}

export default App;
