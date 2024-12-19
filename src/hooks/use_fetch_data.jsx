import { GlobalContext }       from '../context/global_context';
import { useQuery }            from '@tanstack/react-query';
import { useContext, useMemo } from 'react';

const useFetchData = ({ 
    key,
    callback,
    generateList:{start = false,keyOne ='',keyTwo=''} 
  }) => {
  const { isLogin } = useContext(GlobalContext);

  const fetchData = async () => {
    const data = await callback();
    return data;
  }

  const { data,isLoading } = useQuery({
    queryKey       : [key], 
    queryFn        : fetchData,
    refetchOnMount : true,
    enabled        : isLogin
  });


  const generatedList = useMemo(() => {
    if(start && data ){
        return data.map((element) => ({
          id  : element[keyOne],
          name: element[keyTwo],
        }))
    }else{
      return []; 
    }
  },[data,start, keyOne,keyTwo]); 

  //if(generatedList != []) handleList(generatedList,key);

  return {data,isLoading, generatedList}
};

export default useFetchData;
