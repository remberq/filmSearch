import { createRoot } from 'react-dom/client'

import './index.css'
import { FilmApp } from './components/index'

const container = document.querySelector('#root')
const root = createRoot(container)
root.render(<FilmApp />)
