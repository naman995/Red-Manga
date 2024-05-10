import { Text, View, ScrollView, Image } from 'react-native'
import { React, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { signIn, createUser, getCurrentUser } from '../../lib/appwrite'
import { Alert } from 'react-native'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode='contain' />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold text-center'>Login to Aora</Text>
          <FormField title='Email' value={FormField.email} handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType="email-address" />
          <FormField title='Password' value={FormField.password} handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7' />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={'mt-7'}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't Have Account
            </Text>
            <Link href="/sign-up" className='  text-lg font-psemibold text-secondary'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
