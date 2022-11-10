import { Heading, useToast, VStack } from "native-base";
import { useState } from "react";
import Logo from "../assets/logo.svg";
import { api } from "../services/api";
import { Input } from "../components/Input";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: "Informe o código",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/pools/join", { code });

      toast.show({
        title: "Você entrou no bolão com sucesso",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("pools");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.response?.data?.message === "Bolão não encontrado!") {
        toast.show({
          title: "Não foi possível encontrar o bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (
        error.response?.data?.message ===
        "Você já está participando deste Bolão!"
      ) {
        toast.show({
          title: "Você já está participando deste bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }
      toast.show({
        title: "Você já está participando deste bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          textAlign="center"
          mb={8}
        >
          Encontre um bolão através de{"\n"} seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual o nome do seu bolão"
          autoCapitalize="characters"
          onChangeText={setCode}
        />

        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
