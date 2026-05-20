import { useState } from "react";
import {View, Text, TextInput, TouchableOpacity,StyleSheet, ActivityIndicator, Image} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";


const API_URL ="http://192.168.10.194:8080"

export default function AddProductScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [loading, setLoading] = useState(false);

  // abre a galeria do celular
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleAdd = async () => {
    if (!name || !price || !image) {
      alert("Preencha todos os campos e selecione uma imagem!");
      return;
    }

    try {
      setLoading(true);

      // monta o FormData para enviar imagem + dados
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", {
        uri: image.uri,
        name: image.fileName ?? "product.jpg",
        type: image.mimeType ?? "image/jpeg",
      } as any);

      const response = await fetch(`${API_URL}/api/AddProduct`, {
        method: "POST",
        body: formData,
        // não coloca Content-Type aqui! O fetch define automaticamente
      });

      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      router.back();
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar produto!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Produto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do produto"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* Botão de selecionar imagem */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.previewImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Feather name="image" size={25} color="#aaa" />
            <Text style={styles.imagePlaceholderText}>Selecionar imagem</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Adicionar Produto</Text>
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },
  imagePlaceholder: {
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  imagePlaceholderText: {
    color: "#aaa",
    fontSize: 14,
  },
  previewImage: {
    width: "100%",
    height: 160,
  },
  button: {
    backgroundColor: "#e56a9b",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});