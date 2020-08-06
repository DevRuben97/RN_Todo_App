import AsyncStorage from "@react-native-community/async-storage";

const storage = {
  async saveData(key, data) {
    try{
        await AsyncStorage.setItem(key, JSON.stringify(data));
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
  },

  async getData(key) {
    try {
      const data = await AsyncStorage.getItem(key);

      return JSON.parse(data);
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

export default storage;
