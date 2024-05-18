/* global Package */
export const InjectData = {}

// Replace communitypackages:inject-data with our new API, this is for compatibility
// with third party packages that still depend upon the communitypackages version.
if (Package['communitypackages:inject-data']) {
	Package['communitypackages:inject-data'].InjectData = InjectData
}
