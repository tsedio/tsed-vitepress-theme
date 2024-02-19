---
layout: home
hero:
  name: "Our Team"
  tagline: "The development of Ts.ED and its ecosystem is guided by an international team (it's our goal).
We have a very active and engaged team that is constantly striving to push Ts.ED forward."
---
<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import team from './team.json'

const members = team.map((member) => {
   return {
     avatar: member.src,
     name: member.title + ' - ' + member.job,
     title: member.role,
     links: [
        { icon: 'github', link: 'https://github.com/' + member.github },
        member.twitter && { icon: 'twitter', link: 'https://x.com/' + member.twitter }
     ].filter(Boolean)
   }
})
</script>

<VPTeamMembers size="small" :members="members" />
