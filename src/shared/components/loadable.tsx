import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import { LinearProgressProps } from '@mui/material/LinearProgress'
import { Loader } from 'shared/components'

type LoaderProps = LinearProgressProps

const Loadable = (
  Component: LazyExoticComponent<() => JSX.Element> | ComponentType<React.ReactNode>,
) =>
  function (props: LoaderProps) {
    return (
      <Suspense fallback={<Loader />}>
        {/* @ts-expect-error qwe*/}
        <Component {...props} />
      </Suspense>
    )
  }

export default Loadable
