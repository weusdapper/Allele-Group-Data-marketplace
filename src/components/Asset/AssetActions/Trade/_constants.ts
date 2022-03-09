import { FormTradeData } from './_types'

export const initialValues: FormTradeData = {
  baseToken: '0',
  datatoken: '0',
  type: 'buy',
  output: 'exactIn',
  slippage: '5'
}

export const slippagePresets = ['5', '10', '15', '25', '50']

// validationSchema lives in components/organisms/AssetActions/Trade/FormTrade.tsx
