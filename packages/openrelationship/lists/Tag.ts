import { utils } from '@mirrormedia/lilith-core'
import { list } from '@keystone-6/core';
import {relationship,checkbox,select,text} from '@keystone-6/core/fields';
	  
const {
  allowRoles,
  admin,
  moderator,
  editor,
  owner,
} = utils.accessControl

const listConfigurations = list ({
  fields: {
	name: text({
      isIndexed: 'unique', 
      label: '標籤名稱', 
      validation: { isRequired: true} 
    }),
    brief: text({
      label: '前言',  
      ui: { displayMode: 'textarea' } 
    }),
    state: select({
      defaultValue: 'active', 
      options: [ 
        { label: 'inactive', value: 'inactive' }, 
        { label: 'active', value: 'active' }, 
        { label: 'archived', value: 'archived' }
      ], 
      label: '狀態',
    }),
    ogTitle: text({
      validation: { isRequired: false}, 
      label: 'FB分享標題' 
    }),
    ogDescription: text({
      validation: { isRequired: false}, 
      label: 'FB分享說明',  
    }),
    isFeatured: checkbox({
      label: '置頂', isIndexed: true 
    }),
  },
  access: {
	operation: {
	  query: allowRoles(admin, moderator, editor),
	  update: allowRoles(admin, moderator),
	  create: allowRoles(admin, moderator),
	  delete: allowRoles(admin),
	},
  },
})
export default utils.addTrackingFields(listConfigurations)
