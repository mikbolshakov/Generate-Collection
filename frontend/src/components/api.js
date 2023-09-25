// api.js

import { useQuery, useMutation, queryCache } from 'react-query';
import axios from 'axios';

export const fetchWatches = async () => {
  const response = await axios.get('http://localhost:3500/all');
  return response.data;
};

export const mintNft = async (nftData) => {
  const response = await axios.post('http://localhost:3500/mint', nftData);
  return response.data;
};

export const useWatches = () => {
  return useQuery('watches', fetchWatches);
};

export const useMintNft = () => {
  return useMutation(mintNft, {
    onSuccess: () => {
      // После успешного минта, инвалидируйте кеш данных о NFT, чтобы обновить их
      queryCache.invalidateQueries('watches');
    },
  });
};
