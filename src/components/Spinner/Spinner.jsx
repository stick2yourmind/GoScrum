import '../../css/Spinner.css'
import { useColorMode } from '@chakra-ui/react'
const Spinner = () => {
  const { colorMode } = useColorMode()

  return (
    <div className="sk-cube-grid">
      <div className={colorMode === 'light' ? 'sk-cube sk-cube1' : 'sk-cube-dark sk-cube1'} />
      <div className={colorMode === 'light' ? 'sk-cube sk-cube1' : 'sk-cube-dark sk-cube2'} />
      <div className={colorMode === 'light' ? 'sk-cube sk-cube2' : 'sk-cube-dark sk-cube3'} />
      <div className={colorMode === 'light' ? 'sk-cube sk-cube4' : 'sk-cube-dark sk-cube4'} />
      <div className={colorMode === 'light' ? 'sk-cube sk-cube5' : 'sk-cube-dark sk-cube5'} />
      <div className={colorMode === 'light' ? 'sk-cube sk-cube6' : 'sk-cube-dark sk-cube6'} />
      <div className={colorMode === 'light' ? 'sk-cube sk-cube7' : 'sk-cube-dark sk-cube7'} />
      <div className={colorMode === 'light' ? 'sk-cube sk-cube8' : 'sk-cube-dark sk-cube8'} />
      <div className={colorMode === 'light' ? 'sk-cube sk-cube9' : 'sk-cube-dark sk-cube9'} />
    </div>
  )
}

export default Spinner
