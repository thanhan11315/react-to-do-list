import './App.css';
import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

function App() {
  var buttonAddElement = document.querySelector('.add')
  var buttonEditElement = document.querySelector('.edit')
  var inputElement = document.querySelector('.input')

  const [list, setlist] = useState('')

  const [lists, setlists] = useState(() => {
    const getLocalLists = JSON.parse(localStorage.getItem('lists'))
    if (getLocalLists == null) {
      return []
    } else {
      return getLocalLists
    }
  })

  var handleSubmit = () => {
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

  var handleDelete = (k) => {
    setlists(() => {
      const setLocalLists = [...lists]
      setLocalLists.splice(k, 1)
      localStorage.setItem('lists', JSON.stringify(setLocalLists))
      return setLocalLists
    })
  }

  var handlEdit = (e) => {
    setlist(lists[e])
    buttonAddElement.classList.add('hidden')
    buttonEditElement.classList.remove('hidden')
    const spanElement = document.querySelector(`li:nth-child(${e + 1}) .span`)
    var lengthArray = lists.length
    for (var i = 0; i < lengthArray; i++) {
      const spanElementAll = document.querySelector(`li:nth-child(${i + 1}) .span`)
      spanElementAll.classList.remove('red')
    }
    spanElement.classList.add('red')
    buttonEditElement.onclick = function handleEditSubmit() {
      if (!inputElement.value) {
        alert('vui long nhap du lieu chinh sua')
      } else {
        setlists(() => {
          const setLocalLists = [...lists]
          setLocalLists.splice(e, 1, inputElement.value)
          localStorage.setItem('lists', JSON.stringify(setLocalLists))
          return setLocalLists
        })
        buttonEditElement.classList.add('hidden')
        buttonAddElement.classList.remove('hidden')
        spanElement.classList.remove('red')
        setlist('')
      }
    }
  }


  const enterkey = (e) => {
    if (e.which === 13 && buttonEditElement.classList.contains('hidden') === true) {
      buttonAddElement.click()
    } if (e.which === 13 && buttonEditElement.classList.contains('hidden') === false) {
      buttonEditElement.click()
    }
  }



  return (
    <div className='container'>
      <div className='box-title'>
        <Header />
        <div>
          <input className='input' value={list} onKeyPress={(e) => enterkey(e)} onChange={e => setlist(e.target.value)} />
          <button className='add' onClick={() => handleSubmit()}>Add</button>
          <button className='edit hidden'>Edit</button>
        </div>
      </div>
      <ul className='my-list'>
        {lists.map((list, index) => (
          <li key={index}>
          <span>{list}</span>
          <button className='span' onClick={() => handlEdit(index)} ><FontAwesomeIcon icon={ faEdit } /></button>
          <button className='delete-button' onClick={() => handleDelete(index)}>x</button>
          </li>
        ))}
      </ul>
    </div>)
}

export default App;
