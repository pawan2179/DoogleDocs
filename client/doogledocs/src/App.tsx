import './App.css'
import Login from './pages/login'
import { BrowserRouter, Routes, Route } from 'react-router'
import Register from './pages/register'
import { AuthProvider } from './contexts/authContext'
import { ToastProvider } from './contexts/toast-context'
import VerifyEmail from './pages/user/verifyEmail'
import AuthRoute from './components/molecules/auth-route'
import Create from './pages/documents/create'
import Document from './pages/documents'
import { DocumentProvider } from './contexts/documentContext'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <Routes>
              <Route path='/' element={<h1>Home Page</h1>}/>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/user/verify-email/:token' element={<VerifyEmail />} />
              <Route path='/document/create' element={<AuthRoute element={<Create />}/>} />
              <Route path='/document/:id' element={
                <AuthRoute element={
                  <DocumentProvider>
                    <Document />
                  </DocumentProvider>
                }>
                </AuthRoute>} />
            </Routes>
          </ToastProvider>
        </AuthProvider>
        </BrowserRouter>
    </>
  )
}

export default App
