// api 统一管理
import axios from "./axios";
const AK = 'b1KWfOlG0FfAFyetNOaMFnINpmLuNVjo'


// 使用百度api接口获取定位信息
export const getPlace = () => axios.get(`/api/location/ip?ak=${AK}&coor=bd09ll`)

// 获取定位信息附近的地点名称
export const getAddress = (point,page) => axios.get(`/api/place/v2/search?query=行政地标&location=${point.y},${point.x}&radius=100000&output=json&ak=${AK}&page_size=10&page_num=${page}`)