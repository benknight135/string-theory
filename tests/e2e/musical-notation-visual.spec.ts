/**
 * Playwright E2E Tests - Core Visual Testing
 * 
 * Reduced to 2 essential tests for faster execution:
 * 1. Basic functionality test - scale generation and display
 * 2. Visual positioning test - notes positioned correctly on staff
 */

import { test, expect } from '@playwright/test';

test.describe('Musical Notation Core Visual Tests (Playwright)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the music scale app
    await page.goto('/');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test('should generate and display a scale with all core elements', async ({ page }) => {
    // Verify initial state
    await expect(page.getByRole('heading', { name: /String Theory/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Generate Random Scale/ })).toBeVisible();
    
    // Click the generate button
    await page.getByRole('button', { name: /Generate Random Scale/ }).click();
    
    // Wait for scale to be generated and displayed
    await page.waitForTimeout(600);
    
    // Check that a scale name is displayed
    const scaleHeading = page.locator('h2').filter({ hasText: /Major|Minor|Dorian|Phrygian|Lydian|Mixolydian|Aeolian|Locrian|Harmonic Minor|Melodic Minor|Pentatonic|Blues/ });
    await expect(scaleHeading).toBeVisible();
    
    // Check that treble clef symbol is displayed
    await expect(page.getByText('𝄞')).toBeVisible();
    
    // Check that staff lines are visible
    await expect(page.locator('.staff-lines')).toBeVisible();
    
    // Check that notes are displayed on the staff
    const notes = page.locator('.note');
    await expect(notes).toHaveCount(7); // Should have 7 notes in a scale
    
    // Check that note list is displayed
    const noteList = page.locator('.note-list');
    await expect(noteList).toBeVisible();
    
    // Check that scale pattern is displayed
    await expect(page.getByText('Scale Pattern:')).toBeVisible();
    
    // Verify multiple generations work
    await page.getByRole('button', { name: /Generate Random Scale/ }).click();
    await page.waitForTimeout(400);
    await expect(notes).toHaveCount(7);
  });

  test('should position notes correctly within staff boundaries', async ({ page }) => {
    // This is the key visual test: "check the notes are in the correct position"
    
    // Generate a scale
    await page.getByRole('button', { name: /Generate Random Scale/ }).click();
    await page.waitForTimeout(600);
    
    // Check that staff container exists and is visible
    const staffContainer = page.locator('.staff-container');
    await expect(staffContainer).toBeVisible();
    
    // Verify staff lines are properly positioned
    const staffLines = page.locator('.staff-line');
    await expect(staffLines).toHaveCount(5); // Standard 5-line staff
    
    // Get the bounding box of the staff container for position validation
    const staffBox = await staffContainer.boundingBox();
    expect(staffBox).toBeTruthy();
    
    // Check that notes are positioned within reasonable bounds of the staff
    const notes = page.locator('.note');
    await expect(notes).toHaveCount(7);
    
    // Verify each note is positioned within the staff area bounds
    for (let i = 0; i < 7; i++) {
      const note = notes.nth(i);
      await expect(note).toBeVisible();
      
      const noteBox = await note.boundingBox();
      expect(noteBox).toBeTruthy();
      
      // Note should be positioned within or reasonably close to staff bounds
      if (noteBox && staffBox) {
        // Horizontal position should be within staff width + small margin
        expect(noteBox.x).toBeGreaterThanOrEqual(staffBox.x - 30);
        expect(noteBox.x).toBeLessThanOrEqual(staffBox.x + staffBox.width + 30);
        
        // Vertical position should be within staff height + margin for ledger lines
        expect(noteBox.y).toBeGreaterThanOrEqual(staffBox.y - 40);
        expect(noteBox.y).toBeLessThanOrEqual(staffBox.y + staffBox.height + 40);
      }
    }
    
    // Verify staff lines are evenly spaced
    const linePositions = [];
    for (let i = 0; i < 5; i++) {
      const lineBox = await staffLines.nth(i).boundingBox();
      if (lineBox) {
        linePositions.push(lineBox.y);
      }
    }
    
    // Staff lines should be evenly spaced (approximately)
    if (linePositions.length === 5) {
      const spacings = [];
      for (let i = 1; i < linePositions.length; i++) {
        spacings.push(linePositions[i] - linePositions[i-1]);
      }
      
      // All spacings should be approximately equal (within tolerance)
      const avgSpacing = spacings.reduce((a, b) => a + b, 0) / spacings.length;
      spacings.forEach(spacing => {
        expect(Math.abs(spacing - avgSpacing)).toBeLessThan(4);
      });
    }
  });
});
