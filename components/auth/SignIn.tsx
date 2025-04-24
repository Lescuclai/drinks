import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useUserContext } from "@/providers/userProvider";
import { ThemedText } from "@/components/ThemedText";



export default function SignIn() {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const user = useUserContext();
    const { id } = user || { id: null };
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        getValues,
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

    const handleForgotPassword = async (): Promise<void> => {
        const email = getValues("email");
        if (!email) {
            setError("email", {
                type: "custom",
                message: "Veuillez entrer votre adresse e-mail.",
            });
            setMessage("");
            return
        }
        try {
            clearErrors();
            await sendPasswordResetEmail(auth, email);
            setMessage("Un e-mail de réinitialisation a été envoyé à votre adresse e-mail.");

        } catch (error) {
            setError("root", {
                type: "custom",
                message: "Une erreur s'est produite lors de la réinitialisation du mot de passe.",
            });
            setMessage("");
        }
    };

    return (
        <View style={styles.container}>
            {id ?
                <>
                    <ThemedText style={styles.container}>Vous êtes déjà connecter bravo</ThemedText>
                    <CustomButton
                        mode='contained'
                        title='Se déconnecter'
                        onPressFunc={handleSubmit(submitSignOut)}>
                    </CustomButton>
                </> :
                <>
                    <ThemedText style={styles.container}>Se connecter</ThemedText>
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
                    <Text style={[styles.link, { textAlign: 'right' }]} onPress={() => handleForgotPassword()}>
                        Mot de passe oublié ?
                    </Text>


                    {Boolean(errors.root) && (
                        <ThemedText style={{ paddingTop: 15 }} >
                            {errors.root?.message}
                        </ThemedText>
                    )}
                    {message != '' && (
                        <ThemedText style={{ paddingTop: 15 }} >
                            {message}
                        </ThemedText>
                    )}

                    <CustomButton
                        mode='contained'
                        title='Se connecter'
                        onPressFunc={handleSubmit(submitSignIn)}>
                    </CustomButton>
                    <Text style={{ paddingTop: 15 }} >
                        Pas encore de compte ?
                        <Text
                            onPress={() => navigation.navigate("sign-up")}
                            style={styles.link}
                        >
                            Créer un compte
                        </Text>
                    </Text>

                </>
            }
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    link: {
        color: '#21005d',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    }
});
