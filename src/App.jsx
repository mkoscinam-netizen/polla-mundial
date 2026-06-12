import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GroupPage from './components/GroupPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ineptos" element={<GroupPage grupo="Ineptos" />} />
        <Route path="/andina" element={<GroupPage grupo="Andina" />} />
        <Route path="*" element={<Navigate to="/andina" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
