// Redux store provider component for Next.js
// Wraps the application to provide Redux store context to all components
'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './store'

export default function StoreProvider({ children }) {
  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}