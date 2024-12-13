export default function useAssets(asset: string) {
  const assets = import.meta.glob('/assets/**/*.(png|svg|gif|jpg|jpeg)', { eager: true })

  const getAssetUrl = () => {
    if (assets[asset]) {
      return assets[asset].default
    }
  }

  return getAssetUrl()
}
