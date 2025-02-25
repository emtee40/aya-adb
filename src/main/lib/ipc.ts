import { dialog, OpenDialogOptions } from 'electron'
import contextMenu from './contextMenu'
import { handleEvent } from './util'

export function init() {
  handleEvent('showContextMenu', contextMenu)
  handleEvent('showOpenDialog', (options: OpenDialogOptions = {}) =>
    dialog.showOpenDialog(options)
  )
}
