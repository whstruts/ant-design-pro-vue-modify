<template>
  <a-card>
    <pre v-highlightjs><code class="java" v-html="content"></code></pre>
  </a-card>
</template>

<script>

  export default {
    name: 'code-highlight.vue',
    computed: {

    },
    data () {
      return {
        content: `package org.pzy.winter.base.support.context;

import com.alibaba.ttl.TransmittableThreadLocal;
import org.pzy.winter.domain.GlobalConstant;
import org.pzy.winter.domain.SimpleUserInfo;

import java.util.Optional;

/**
 * 存储当前上下文的用户信息
 *
 * @author pan
 * @since 2019-03-25
 */
public class CurrentUserContext {

    /**
     * 用户id
     */
    private static final ThreadLocal<SimpleUserInfo> USER_INFO = new TransmittableThreadLocal<>();

    /**
     * 填充用户信息到ThreadLocal中
     *
     * @param user
     */
    public static void setUser(SimpleUserInfo user) {
        USER_INFO.set(user);
    }

    /**
     * 从ThreadLocal获取用户信息
     *
     * @return
     */
    public static Optional<SimpleUserInfo> getUser() {
        return Optional.ofNullable(USER_INFO.get());
    }

    /**
     * 获取用户唯一标识
     *
     * @return
     */
    public static Optional<String> getUserFlag() {
        Optional<SimpleUserInfo> optional = getUser();
        return optional.isPresent() ? Optional.ofNullable(optional.get().getFlag()) : Optional.empty();
    }

    /**
     * 获取用户唯一标识
     *
     * @return
     */
    public static Optional<Long> getUserId() {
        Optional<SimpleUserInfo> optional = getUser();
        return optional.isPresent() ? Optional.ofNullable(optional.get().getId()) : Optional.of(0L);
    }

    /**
     * 获取用户真实姓名
     *
     * @return
     */
    public static Optional<String> getUserRealName() {
        Optional<SimpleUserInfo> optional = getUser();
        return optional.isPresent() ? Optional.ofNullable(optional.get().getRealName()) : Optional.of(GlobalConstant.EMPTY_STRING);
    }

    /**
     * 获取用户昵称
     *
     * @return
     */
    public static Optional<String> getUserNikeName() {
        Optional<SimpleUserInfo> optional = getUser();
        return optional.isPresent() ? Optional.ofNullable(optional.get().getNikeName()) : Optional.of(GlobalConstant.EMPTY_STRING);
    }

    /**
     * 清除ThreadLocal中的用户信息
     */
    public static void removeUser() {
        USER_INFO.remove();
    }
}
`
      }
    }
  }
</script>

<style scoped>

</style>