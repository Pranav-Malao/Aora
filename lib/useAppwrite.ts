import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const useAppwrite = (fn: () => Promise<any[]>) => { // async func dalega yaha
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const getPosts = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getPosts();
  }, []);

  const refetch = () => getPosts();

  return { data, refetch, loading };
}

export default useAppwrite;