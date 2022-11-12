const uniPairGetTokenOrder = (tokenA, tokenB) => {
  const [token0, token1] =
    Number(tokenA) < Number(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];

  return [token0, token1];
};

export default uniPairGetTokenOrder;
