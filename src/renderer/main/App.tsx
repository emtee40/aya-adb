import Toolbar from './components/toolbar/Toolbar'
import Logcat from './components/logcat/Logcat'
import Shell from './components/shell/Shell'
import Overview from './components/overview/Overview'
import Screenshot from './components/screenshot/Screenshot'
import Style from './App.module.scss'
import LunaModal from 'luna-modal/react'
import { t } from '../lib/util'
import { useState, useEffect, PropsWithChildren, FC } from 'react'
import { createPortal } from 'react-dom'
import store from './store'
import { observer } from 'mobx-react-lite'
import icon from '../assets/icon.png'

export default observer(function App() {
  const [aboutVisible, setAboutVisible] = useState(false)

  useEffect(() => {
    const showAbout = () => setAboutVisible(true)
    const offShowAbout = main.on('showAbout', showAbout)
    return () => {
      offShowAbout()
    }
  }, [])

  return (
    <>
      <Toolbar />
      <div className={Style.workspace}>
        <div className={Style.panels} key={store.device ? store.device.id : ''}>
          <Panel panel="overview">
            <Overview />
          </Panel>
          <Panel panel="screenshot">
            <Screenshot />
          </Panel>
          <Panel panel="logcat">
            <Logcat />
          </Panel>
          <Panel panel="shell">
            <Shell />
          </Panel>
        </div>
      </div>
      {createPortal(
        <LunaModal
          title={t('aboutAya')}
          visible={aboutVisible}
          width={400}
          onClose={() => setAboutVisible(false)}
        >
          <div className={Style.about}>
            <img className={Style.icon} src={icon} />
            <div>AYA</div>
            <div>
              {t('version')} {AYA_VERSION}
            </div>
          </div>
        </LunaModal>,
        document.body
      )}
    </>
  )
})

interface IPanelProps {
  panel: string
}

const Panel: FC<PropsWithChildren<IPanelProps>> = observer(function Panel(
  props
) {
  const [used, setUsed] = useState(false)

  let visible = false

  if (store.panel === props.panel) {
    if (!used) {
      setUsed(true)
    }
    visible = true
  }

  const style: React.CSSProperties = {}
  if (!visible) {
    style.opacity = 0
    style.pointerEvents = 'none'
  }

  return (
    <div className={Style.panel} style={style}>
      {used ? props.children : null}
    </div>
  )
})
