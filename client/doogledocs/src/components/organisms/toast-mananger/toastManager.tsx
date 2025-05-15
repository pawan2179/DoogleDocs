import { useContext, useRef } from 'react'
import { ToastContext } from '../../../contexts/toast-context'
import useWindowSize from '../../../hooks/useWindowSize';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Toast from '../../atoms/toasts';

const ToastManager = () => {
  const {toasts} = useContext(ToastContext);
  const {heightStr} = useWindowSize();
  const nodeRef = useRef(null);

  return (
    <div className='left-4 top-4 sm:top-auto sm:bottom-4 fixed z-40 right-4 sm:w-96 overflow-y-auto'
      style={{maxHeight: `calc(${heightStr} - 2rem)`}}
    >
      <TransitionGroup className='space-y-2'>
        {toasts.reverse().map((toast) => {
          return (
            <CSSTransition
              key={toast.id}
              timeout={200}
              className='slide-in'
              unmountOnExit
              nodeRef={nodeRef}
              children={<div ref={nodeRef}><Toast {...toast} /></div>}
            />
          )
        })}
      </TransitionGroup>
    </div>
  )
}

export default ToastManager;