
interface SpinnerProps {
  size: 'sm' | 'md' | 'lg';
  className?: string
}

const Spinner = ({size, className}: SpinnerProps) => {
  const getSpinnerSize = () => {
    switch(size) {
      case 'sm':
          return 'w-4 h-4';
          break;
      case 'md':
          return 'w-5 h-5';
          break;
      case 'lg':
          return 'w-7 h-7';
      default: 'w-4 h-4';
    }
  }

  const getSpinnerDivSize = () => {
    switch(size) {
      case 'sm':
          return 'w-4 h-4 border-2 margin-2 border-white';
      case 'md':
          return 'w-5 h-5 border-2 margin-2 border-white';
      case 'lg':
          return 'w-7 h-7 border-2 margin-2 border-white';
    }
  }

  return (
    <div className={`${getSpinnerSize()} ${className}`}>
      <div className={`${getSpinnerDivSize()}`}></div>
      <div className={`${getSpinnerDivSize()}`}></div>
      <div className={`${getSpinnerDivSize()}`}></div>
    </div>
  )
}

export default Spinner;