import color from "Constants/Color"
import Ionicons from "react-native-vector-icons/Ionicons"

const BackButton = ({ navigation }: { navigation: any }) => {
    return <Ionicons name="chevron-back-sharp" size={24} color={color.black} onPress={() => navigation.goBack()} />
}

export default BackButton