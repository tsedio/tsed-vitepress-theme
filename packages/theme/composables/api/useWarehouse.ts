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
  const downloads = ref<number>(20000);
  const maintainers = ref<Set<string>>(new Set());
  const isActive = ref(false);

  const fetchPackages = async () => {
    isActive.value = true;
    const endpoint = `${docsRepo.split("/rest")[0]}/rest/warehouse`;


    try {
      const {data} = await axios.get<WarehousePackage[]>(endpoint);
      packages.value = data;
      downloads.value = 0;
      maintainers.value.clear();

      const items = data.reduce((set, plugin) => {
        plugin.tags.forEach((tag) => set.add(tag));

        downloads.value += plugin.downloads;
        plugin.maintainers.forEach((maintainer) => {
          maintainers.value.add(maintainer.username.toLowerCase());
        });

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

  return {packages, fetchPackages, tags, maintainers, downloads, isActive};
}
