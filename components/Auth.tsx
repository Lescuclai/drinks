import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View, AppState } from 'react-native'
import { supabase } from '../supabase'
import { useForm } from "react-hook-form";
import CustomButton from './CustomButton'
import CustomInput from './CustomInput'
import { useNavigation } from "@react-navigation/native";
import { Session } from '@supabase/supabase-js'


// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function Auth() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    interface FormData {
        email?: string;
        password?: string;
        createEmail?: string;
        createPassword?: string;
    }


    async function signInWithEmail(data: FormData) {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email ?? "",
            password: data.password ?? "",
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
        navigation.navigate("index");
    }

    async function signUpWithEmail(data: FormData) {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: data.email ?? "",
            password: data.password ?? "",
        })

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)


    }
    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            Alert.alert(error.message)
        } else {
            reset() // Reset the form on sign out
            navigation.navigate("index");
        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <CustomInput
                    control={control}
                    name='email'
                    label="Email"
                    rules={{
                        required: "Le champ est recquis",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Format invalide",
                        },
                    }}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <CustomInput
                    control={control}
                    name='password'
                    label='Mot de passe'
                    visibleToggle={() => setIsVisible(!isVisible)}
                    secureTextEntry={!isVisible}
                    rules={{ required: "Le champ est recquis" }}
                    mdp
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                {session && session.user ? (
                    <CustomButton title="Sign out" mode="text" disabled={loading} onPressFunc={() => signOut()} />) :
                    (<>
                        <CustomButton title="Sign in" mode="contained" disabled={loading} onPressFunc={handleSubmit(signInWithEmail)} />
                        <CustomButton title="Sign up" mode="outlined" disabled={loading} onPressFunc={handleSubmit(signUpWithEmail)} />
                    </>)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 2,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})

