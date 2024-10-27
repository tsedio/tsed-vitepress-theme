export function mapSymbol (symbol) {
  return {
    ...symbol,
    // additional properties for the Api search tools
    name: symbol.symbolName,
    type: symbol.symbolType,
    tags: symbol.status.join(','),
    labels: symbol.status
  }
}

export function mapApiReferences (apiReferences) {
  const modules = Object.fromEntries(
    Object.entries(apiReferences.modules).map(([key, item]) => {
      const symbols = item.symbols.reduce((acc, symbol) => {
        if (!acc.has(symbol.symbolName)) {
          acc.set(symbol.symbolName, mapSymbol(symbol))
        }

        return acc
      }, new Map())

      return [
        key,
        {
          ...item,
          symbols: [...symbols.values()]
        }
      ]
    })
  )

  return {
    ...apiReferences,
    modules
  }
}
