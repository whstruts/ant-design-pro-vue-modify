import { verify, sign } from 'jsonwebtoken'
import WinterUtil from './WinterUtil'

const { dateFormat } = WinterUtil

// jwt token 默认的加密秘钥
const defaultSecret = '2011-06-22:pzy'

/**
 * 创建jwt
 * @param {object} payload 载荷(要装载的数据)
 * @param {number} expires 过期时间
 * @param strTimer 过期时间单位. 可选值: days(天), hours(小时), m(分钟), s(秒), ms(毫秒)
 * @param {string} secret jwt token的加密秘钥. 可以不填
 * @return {*}
 */
const createToken = (payload, expires, strTimer, secret = defaultSecret) => {
  return sign(payload, secret, {
    expiresIn: expires + ' ' + strTimer
  })
}

/**
 * 验证token是否有效.
 * 验证成功返回的对象类似:
 * {iat: 1564471370, exp: 1564471550, iss: "cHp5", jti: "b38e0306-266a-437b-9044-47e6b911605f"}
 * 字段意思:
 * <pre>
 *   iss: token的发行者
 *   sub: token的主题
 *   aud: token的接受者(听众)
 *   exp: 数字格式的有效期限，重点是有效期限一定要大于现在的时间(值为unix时间戳,转换时需要乘以1000)
 *   nbf: 生效时间，定义一个时间在这个时间之前 JWT 不能进行处理
 *   iat: 发行的时间，可以被用来判断 JWT 已经发出了多久(值为unix时间戳,转换时需要乘以1000)
 *   jti: JWT 唯一的识别值，可用来防止 JWT 被重复使用，尤其在一次性的 token 特別好用
 * </pre>
 * @param {string} _token
 * @param {string} secret jwt token的密秘钥. 可以不填
 * @return {*} token有效则返回解码之后的jwt对象, 验证失败,则返回false
 */
const verifyToken = (_token, secret = defaultSecret) => {
  return verify(_token, secret, (error, decoded) => {
    if (error) {
      return false
    }
    return {
      ...decoded,
      expStr: dateFormat(new Date(decoded.exp * 1000), 'yyyy-MM-dd hh:mm:ss'),
      iatStr: dateFormat(new Date(decoded.iat * 1000), 'yyyy-MM-dd hh:mm:ss'),
      // 计算token剩多少秒过期
      remainSecond: parseInt(((decoded.exp * 1000) - new Date().getTime()) / 1000),
      // 计算token剩多少分钟过期
      remainMinute: parseInt(((decoded.exp * 1000) - new Date().getTime()) / 60000)
    }
  })
}

export { createToken, verifyToken }
