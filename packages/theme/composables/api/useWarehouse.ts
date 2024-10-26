import {ref} from "vue";
import axios from "axios";

export interface WarehousePackage {
  name: string;
  description: string;
  icon: string;
  homepage: string;
  npm: string;
  repository: string;
  stars: number;
  downloads: number;
  tags: string[];
  maintainers: {username: string; avatar: string}[];
  type: "official" | "premium" | "community";
  category: string;
}

export function useWarehouse(docsRepo: string) {
  const packages = ref<WarehousePackage[]>([]);
  const tags = ref<string[]>([]);
  const isActive = ref(false);

  const fetchPackages = async () => {
    isActive.value = true;
    const endpoint = `${docsRepo.split("/rest")[0]}/rest/warehouse`;

    try {
      const {data} = await axios.get<WarehousePackage[]>(endpoint);

      packages.value = data;

      const items = data.reduce((set, plugin) => {
        plugin.tags.forEach((tag) => set.add(tag));
        return set;
      }, new Set<string>());

      tags.value = Array.from(items);

      return packages;
    } catch (error) {
      packages.value = [];
    } finally {
      isActive.value = false;
    }
  };

  return {packages, fetchPackages, tags, isActive};
}
