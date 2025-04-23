import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useUserContext } from "@/providers/userProvider";
import { ThemedText } from "@/components/ThemedText";


export default function SignIn() {
    const [isVisible, setIsVisible] = useState(false);
    const user = useUserContext();
    const { id } = user || { id: null };
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    interface FormData {
        email: string;
        password: string;
    }

    const submitSignIn = async (data: FormData) => {
        try {
            clearErrors();
            await signInWithEmailAndPassword(auth, data.email, data.password);
            reset();
            navigation.goBack();
        } catch (error) {
            setError("root", {
                type: "custom",
                message: "Oups ! Les identifiants sont incorrects.",
            });
        }
    };

    const submitSignOut = async (): Promise<void> => {
        try {
            await signOut(auth);
            navigation.goBack();
        } catch (error) {
            console.log("error", error);
        }
    };
    return (
        <>
            {id ?
                <>
                    <ThemedText>Vous êtes déjà connecter bravo</ThemedText>
                    <CustomButton
                        mode='contained'
                        title='Se déconnecter'
                        onPressFunc={handleSubmit(submitSignOut)}>
                    </CustomButton>
                </> :
                <>
                    <ThemedText>Se connecter</ThemedText>
                    <CustomInput
                        control={control}
                        name='email'
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
                        name='password'
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
                        title='Se connecter'
                        onPressFunc={handleSubmit(submitSignIn)}>
                    </CustomButton>
                </>
            }
        </>
    );

}
