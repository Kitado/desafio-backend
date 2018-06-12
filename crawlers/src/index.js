import 'babel-polyfill'

import './db/connection'
import { startCrawler } from './crawler/index'

startCrawler()
