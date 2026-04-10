-- ============================================================================
-- STUDENT CLASS SYNC - DATABASE MIGRATION SCRIPT
-- Purpose: Create missing classes and prepare for student-to-class linking
-- ============================================================================

-- ===== STEP 1: CREATE MISSING CLASSES BASED ON STUDENT DATA =====
-- These classes are referenced by students but don't exist in the classes table

INSERT IGNORE INTO classes (class_form, form_level, stream, name, level_type, academic_year, is_active, max_capacity, created_at, updated_at) 
VALUES 
    ('S1', 1, 'Mixed', 'Senior 1', 'O_LEVEL', '2025-2026', 0x01, 50, NOW(), NOW()),
    ('S2', 2, 'Mixed', 'Senior 2', 'O_LEVEL', '2025-2026', 0x01, 50, NOW(), NOW()),
    ('S3', 3, 'A', 'S3A', 'O_LEVEL', '2025-2026', 0x01, 50, NOW(), NOW()),
    ('S4', 4, 'Mixed', 'Senior 4', 'O_LEVEL', '2025-2026', 0x01, 50, NOW(), NOW());

-- ===== STEP 2: VERIFY NEW CLASSES WERE CREATED =====
SELECT id, name, form_level, stream, level_type FROM classes WHERE name IN ('Senior 1', 'Senior 2', 'S3A', 'Senior 4');

-- ===== STEP 3: CHECK CURRENT STATE OF DATA =====
-- Count students with null school_class_id
SELECT 
    COUNT(*) as unlinked_students,
    COUNT(DISTINCT current_class) as unique_class_names
FROM students 
WHERE school_class_id IS NULL;

-- Show breakdown of unlinked students by their current_class value
SELECT 
    current_class,
    COUNT(*) as count
FROM students 
WHERE school_class_id IS NULL
GROUP BY current_class
ORDER BY count DESC;

-- ===== STEP 4: MANUAL CLASS LINKING (if needed) =====
-- If you want to manually link students before calling the backend migration

-- Example: Link all "Senior 1" students to the S1A class (get the ID first)
-- UPDATE students 
-- SET school_class_id = (SELECT id FROM classes WHERE name = 'Senior 1' LIMIT 1)
-- WHERE current_class = 'Senior 1' AND school_class_id IS NULL;

-- Link "Senior 2" students
-- UPDATE students 
-- SET school_class_id = (SELECT id FROM classes WHERE name = 'Senior 2' LIMIT 1)
-- WHERE current_class = 'Senior 2' AND school_class_id IS NULL;

-- Link "Senior 4" students
-- UPDATE students 
-- SET school_class_id = (SELECT id FROM classes WHERE name = 'Senior 4' LIMIT 1)
-- WHERE current_class = 'Senior 4' AND school_class_id IS NULL;

-- Link "S3A" students (if not already in existing S3A, S3B, etc.)
-- UPDATE students 
-- SET school_class_id = (SELECT id FROM classes WHERE name = 'S3A' LIMIT 1)
-- WHERE current_class = 'S3A' AND school_class_id IS NULL;

-- ===== STEP 5: AUTO MIGRATION VIA BACKEND =====
-- After running this script:
-- 1. Restart the Spring Boot application
-- 2. Call POST /api/students/migrate/link-to-classes
-- 3. This will automatically link all students based on matching class names

-- ===== VERIFICATION QUERIES =====

-- Check classes that exist now
SELECT id, name, form_level, stream FROM classes ORDER BY name;

-- Check how many students are still unlinked
SELECT 
    COUNT(*) as unlinked,
    GROUP_CONCAT(DISTINCT current_class) as class_names
FROM students 
WHERE school_class_id IS NULL;

-- Check linked students (should increase after migration)
SELECT 
    COUNT(DISTINCT school_class_id) as linked_classes,
    COUNT(*) as total_linked
FROM students 
WHERE school_class_id IS NOT NULL;

-- Full student status report
SELECT 
    COUNT(*) as total_students,
    SUM(CASE WHEN school_class_id IS NOT NULL THEN 1 ELSE 0 END) as linked,
    SUM(CASE WHEN school_class_id IS NULL THEN 1 ELSE 0 END) as unlinked
FROM students;
