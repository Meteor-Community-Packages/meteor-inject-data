export let InjectData: {
  getData: (key: string, callback: (data: any) => any) => void;
};

InjectData = {};
// Replace meteorhacks:inject-data with our new API, this is for compatibility
// with third party packages that still depend upon the meteorhacks version.
if (Package['meteorhacks:inject-data']) {
  Package['meteorhacks:inject-data'].InjectData = InjectData;
}

Meteor.User;
