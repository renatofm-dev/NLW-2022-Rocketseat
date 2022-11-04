import { useEffect, useState } from "react";
import { HStack, useToast, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";

import { api } from "../services/api";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { poolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";



interface RouteParams {
    id: string;
}

export function Details () {
    const [optionSelected, setOptionSelected] = useState<'Seus plapites' | 'Ranking do grupo'>('Seus plapites');
    const [isLoading, setIsLoading] = useState(true);
    const [ poolDetails, setPoolDetails ] = useState<poolCardProps>({} as poolCardProps);

    const toast = useToast();
    const route = useRoute();
    const { id } = route.params as RouteParams;

    async function fetchPoolsDetails(){
        try {
            setIsLoading(true);

            const response = await api.get(`/pools/${id}`);
            setPoolDetails(response.data.pool);

        } catch (error) {
            console.log(error);

            toast.show({
                title: 'Não foi possivel carregar os detalhes',
                placement: 'top',
                bgColor: 'red.500',
            })
            
        }finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPoolsDetails();
    }, [id]);

    if(isLoading) {
        return ( 

        <Loading />
        
        )
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Título do Bolão" showBackButton showShareButton/>

            {
                poolDetails._count?.participants > 0 ?
                <VStack px={5} flex={1}>
                    <PoolHeader
                        data ={poolDetails}
                     />

                     <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option title="Seus palpites" isSelected={true}></Option>
                        <Option title="Ranking do grupo" isSelected={false}></Option>
                     </HStack>


                </VStack>
                : <EmptyMyPoolList code={poolDetails.code} />
            }
            
        </VStack>
    )
}