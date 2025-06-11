import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { StyleSheet, View } from "react-native";

interface DrinkListProps {
    drinkType: string;
}

export default function DrinkList(props: DrinkListProps) {
    const { drinkType } = props;
    return (
        <View style={styles.container}>
            <ThemedText>{drinkType} </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
// import { ThemedText } from "@/components/ThemedText";
// import React from "react";
// import { ScrollView, StyleSheet, View } from "react-native";
// import StarRating from 'react-native-star-rating-widget';
// import { useNavigation } from "@react-navigation/native";
// import ImagePickerSystem from "./ImagePicker";
// import { Controller, useForm } from "react-hook-form";
// import getDrinkData from "@/data/drink";
// import CustomInput from "./CustomInput";
// import CustomButton from "./CustomButton";
// import { useUserContext } from "@/providers/userProvider";
// import { addDoc, collection } from "firebase/firestore";
// import { uploadImg } from "@/firebaseConfig";


// interface DrinkListProps {
//     drinkType: string;
// }

// export default function DrinkList(props: DrinkListProps) {
//     const { drinkType }: DrinkListProps = props;
//     const navigation = useNavigation();
//     const user = useUserContext();
//     const { id } = user || { id: null };

//     interface DrinkData {
//         label: string;
//         key: string;
//         require: boolean;
//         multiline: boolean;
//         percent: boolean;
//     }
//     interface FormData {
//         drinkName: string;
//         maker: string;
//         category: string;
//         country?: string;
//         year: string;
//         taste?: string;
//         alcool?: string;
//         comment?: string;
//         rate: number;
//         imageUri?: string;
//     }

//     const data: Array<DrinkData> = getDrinkData(drinkType);

//     const onSave = async (data: FormData) => {
//         const userId = id;
//         let url = null;
//         try {
//             if (data.imageUri) {
//                 const response = await fetch(data.imageUri); // Fetch the local URI
//                 const blob = await response.blob(); // Convert the response to a Blob
//                 url = await uploadImg(blob); // Upload the Blob and get the download URL
//             }
//             const drinkData = {
//                 ...data,
//                 type: drinkType,
//                 userId,
//                 createAt: Date.now(),
//             };
//             if (url) {
//                 drinkData.imageUri = url; // Only include imageUri if a valid URL exists
//             } else {
//                 delete drinkData.imageUri; // Remove imageUri if no valid URL
//             }
//             return
//             await addDoc(collection(db, "drinks"), drinkData); // Save the document in Firestore
//             navigation.navigate("index");
//         } catch (error) {
//             console.log("error onSave", error);
//         }
//     };
//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//     } = useForm({
//         defaultValues: {
//             drinkName: "",
//             maker: "",
//             category: "",
//             country: "",
//             year: "",
//             taste: "",
//             alcool: "",
//             comment: "",
//             rate: 0,
//             imageUri: "",
//         },
//     });

//     return (
//         <View style={styles.container}>
//             <ScrollView>
//                 <View style={styles.formContainer}>
//                     <Controller
//                         control={control}
//                         name="imageUri"
//                         render={({ field: { onChange, value }, fieldState: { error } }) => (
//                             <View>
//                                 <ImagePickerSystem
//                                     onImagePicked={(uri) => onChange(uri)} // Pass the onChange function
//                                     selectedImage={value} // Pass the current value
//                                 />
//                                 {error && <ThemedText style={{ color: "red" }}>{error.message}</ThemedText>}
//                             </View>
//                         )}
//                     />
//                     <Controller
//                         control={control}
//                         name="rate"
//                         render={({ field: { onChange, value }, fieldState: { error } }) => (
//                             <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//                                 <ThemedText>Note</ThemedText>
//                                 <StarRating
//                                     rating={value}
//                                     onChange={onChange}
//                                     starSize={40}
//                                     maxStars={5}
//                                     enableHalfStar={false}
//                                 />

//                                 {error && <ThemedText style={{ color: "red" }}>{error.message}</ThemedText>}
//                             </View>
//                         )}
//                     />


//                     {data.map(({ label, key, require, multiline, percent }) => {
//                         return (
//                             <View key={key}>
//                                 <CustomInput
//                                     control={control}
//                                     name={key}
//                                     label={require ? `${label}*` : label}
//                                     rules={require ? { required: "Le champ est recquis" } : undefined}
//                                     style={styles.input}
//                                     multiline={multiline}
//                                     percent={percent}
//                                 />
//                             </View>
//                         );
//                     })}
//                 </View>
//                 <CustomButton
//                     mode='contained'
//                     title='Envoyer'
//                     onPressFunc={handleSubmit(onSave)}
//                 />
//             </ScrollView >
//         </View >
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     formContainer: {
//         flex: 1,
//         padding: 5,
//         justifyContent: "center",
//     },
//     input: {
//         margin: 5,
//     },
// });
// function upload(blob: Blob): any {
//     throw new Error("Function not implemented.");
// }

