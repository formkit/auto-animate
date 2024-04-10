// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
var vite_config_default = defineConfig({
  root: "./",
  plugins: [vue()],
  ssgOptions: {
    includeAllRoutes: true
  },
  assetsInclude: ["**/*.svg", "**/*.png"]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJvb3Q6IFwiLi9cIixcbiAgcGx1Z2luczogW3Z1ZSgpXSxcbiAgc3NnT3B0aW9uczoge1xuICAgIGluY2x1ZGVBbGxSb3V0ZXM6IHRydWUsXG4gIH0sXG4gIGFzc2V0c0luY2x1ZGU6IFtcIioqLyouc3ZnXCIsIFwiKiovKi5wbmdcIl0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUVoQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUEsRUFDZixZQUFZO0FBQUEsSUFDVixrQkFBa0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsZUFBZSxDQUFDLFlBQVksVUFBVTtBQUN4QyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
