import { getCodeOwnersFromPaths } from '../src/getCodeOwnersFromPaths'

// these tests use the CODEOWNERS file located in .github/CODEOWNERS
test('* picks @gatsby', async () => {
  expect.assertions(3)
  const inplist: string[] = ['__tests__/getCodeOwners.test.ts']
  const owners: Set<string> = await getCodeOwnersFromPaths(inplist)
  expect(owners).toBeDefined()
  expect(owners.size).toBe(1)
  expect(owners.has('@gatsby')).toBeTruthy()
})

test('src picks @org-teamA but NOT @gatsby', async () => {
  expect.assertions(3)
  const inplist: string[] = ['src/getCodeOwners.ts']
  const owners: Set<string> = await getCodeOwnersFromPaths(inplist)
  expect(owners).toBeDefined()
  expect(owners.size).toBe(1)
  expect(owners.has('@org-teamA')).toBeTruthy()
})

test('multiple codeowners are all chosen', async () => {
  expect.assertions(4)
  const inplist: string[] = ['src/b/c/d.ts']
  const owners: Set<string> = await getCodeOwnersFromPaths(inplist)
  expect(owners).toBeDefined()
  expect(owners.size).toBe(2)
  expect(owners.has('@org-teamB')).toBeTruthy()
  expect(owners.has('@org-teamC')).toBeTruthy()
})
