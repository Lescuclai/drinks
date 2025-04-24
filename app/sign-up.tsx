import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import Header from "@/components/homePage/Header";
import { View, StyleSheet } from "react-native";


export default function SignUpScreen() {
    const [isVisible, setIsVisible] = useState(false);
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm<FormCreationData>();

    interface FormCreationData {
        createEmail: string;
        createPassword: string;
    }
    interface SubmitSignUpError {
        type: string;
        message: string;
    }

    const submitSignUp = async (data: FormCreationData) => {
        try {
            clearErrors();
            await createUserWithEmailAndPassword(auth, data.createEmail, data.createPassword);
            reset();
            navigation.navigate("index", { screen: "home" });
        } catch (error) {
            setError("root", {
                type: "custom",
                message: "Oups ! compte non créés, un problème est survenu.",
            } as SubmitSignUpError);
        }
    };


    return (
        <>
            <Header />
            <View style={styles.container}>

                <ThemedText style={styles.container}>Créer son compte</ThemedText>
                <CustomInput
                    control={control}
                    name='createEmail'
                    label='Email'
                    rules={{
                        required: "Le champ est recquis",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Format invalide",
                        },
                    }}
                />
                <CustomInput
                    control={control}
                    name='createPassword'
                    visibleToggle={() => setIsVisible(!isVisible)}
                    label='Mot de passe'
                    secureTextEntry={!isVisible}
                    rules={{ required: "Le champ est recquis" }}
                    mdp
                />

                {Boolean(errors.root) && (
                    <ThemedText style={{ paddingTop: 15 }} >
                        {errors.root?.message}
                    </ThemedText>
                )}
                <CustomButton
                    mode='contained'
                    title='Créer'
                    onPressFunc={handleSubmit(submitSignUp)}
                />

            </View>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
});
